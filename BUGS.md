# Bugs Found During Testing

This document lists real defects discovered while building this automation suite against
the Restful Booker Platform (automationintesting.online). Each bug was manually reproduced,
verified, and then captured as an automated test where possible.

---

## BUG-01: Critical — Authentication Bypass via Double-Slash URL

**Severity:** Critical
**Priority:** Critical
**Type:** Security

### Steps to Reproduce
1. Send a PUT request to [https://automationintesting.online/api/room/1](https://automationintesting.online/api/room/1) (single slash)
   with a complete, valid room body and no authentication token.
2. Send the identical request to [https://automationintesting.online//api/room/1](https://automationintesting.online//api/room/1)
   (double slash) with the same body and no authentication token.

### Expected Result
Both requests should be treated identically and return 403 Forbidden, since neither
includes valid authentication.

### Actual Result
- Single slash → 403 Forbidden (correct)
- Double slash → 200 OK — the room was updated successfully with no authentication

### Impact
Any unauthenticated user could modify live room data by using this URL pattern,
completely bypassing the platform's authentication system.

---

## BUG-02: GET on a Non-Existent Room Returns 500 Instead of 404

**Severity:** Medium
**Priority:** Medium
**Type:** Functional — API error handling

### Steps to Reproduce
1. Send a GET request to [https://automationintesting.online/api/room/9999](https://automationintesting.online/api/room/9999),
   where 9999 does not correspond to any real room.

### Expected Result
404 Not Found, since the requested resource does not exist.

### Actual Result
500 Internal Server Error, with a response body of:
timestamp, status 500, error "Internal Server Error", path "/room/9999"

### Notes
The same request via DELETE (when authenticated) correctly returns 404 for the same
non-existent ID — this issue is isolated to the GET endpoint specifically, not a
systemic pattern across all room operations.

---

## BUG-03: Malformed JSON Causes 500 Instead of 400 (Multiple Endpoints)

**Severity:** Medium-High
**Priority:** Medium
**Type:** Functional — input validation / error handling

### Steps to Reproduce
1. Send a POST request to /api/auth/login with syntactically invalid, incomplete JSON
   as the request body.
2. Send a POST request to /api/room (authenticated) with the same kind of malformed
   JSON body.

### Expected Result
400 Bad Request in both cases, since the server cannot parse the request.

### Actual Result
Both endpoints return 500 Internal Server Error with a generic message:
"An unexpected error occurred"

### Impact
Confirmed across two separate endpoints, suggesting a systemic gap in how the API handles
unparseable input — it fails with a server crash rather than a clean validation response.

---

## Summary

| ID | Bug | Severity | Status |
|----|-----|----------|--------|
| BUG-01 | Double-slash URL bypasses authentication | Critical | Confirmed |
| BUG-02 | GET non-existent room returns 500 instead of 404 | Medium | Confirmed |
| BUG-03 | Malformed JSON returns 500 instead of 400 | Medium-High | Confirmed |

All three bugs are captured as automated tests in cypress/e2e/apiKnownBugs.cy.js,
where applicable, with assertions documenting the expected (correct) behavior so the tests
will fail until the underlying issues are fixed.
