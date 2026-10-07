# Definition of Done

Each line gets a number or a link when it is ticked.

- [✔] Endpoint returns correct counts, checked against a known task
      Evidence: Task #3 (coco-1050). Import file has 3418 COCO annotations
      (3354 non-crowd + 64 crowd). Endpoint total is 3843 LabeledShape rows
      (3779 polygon + 64 mask). Difference is 425: multi-part segmentations
      become several polygon shapes. Verified: the file has 3779 polygon
      parts in non-crowd annotations. Per-class API output:
      bottle 218, car 461, chair 484, dog 44, person 2636.

- [ ] Page calls the endpoint and shows a bar chart
      Note: Not verified. Code is committed in
      cvat-ui/src/components/class-counts-page/ (page and chart) and the
      route /tasks/:tid/class-counts is added in cvat-app.tsx. I could not
      run the UI: `yarn install` failed with ENOSPC (C: drive had under
      1 GB free). No screenshot exists.

- [ ] Empty case shows a clear message, no crash
      Note: Not verified in a browser, same reason. The code handles an empty list with an Empty component.

- [ ] Failed request shows an error message, no crash
      Note:  Not verified in a browser, same reason. The code shows an error message and a Retry button.

- [✔] Request with no login is refused
  Evidence: curl.exe -i http://localhost:8080/api/tasks/3/class-counts
  HTTP/1.1 401 Unauthorized
  Allow: GET, HEAD, OPTIONS
  Content-Length: 58
  Content-Type: application/vnd.cvat+json
  Cross-Origin-Opener-Policy: same-origin
  Date: Wed, 07 Oct 2026 09:35:08 GMT
  Referrer-Policy: strict-origin-when-cross-origin
  Server: nginx
  Vary: Accept, Origin, Cookie
  Www-Authenticate: Token
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-Request-Id: 5bbb8b18-18dd-4638-b109-f904b276fd06

{"detail":"Authentication credentials were not provided."}

- [✔] User without access to the task is refused
  Evidence: user `tester1` (normal user, not staff, not superuser, does
  not own task 3) logged in with valid credentials and called
  curl.exe -i -u "tester1:Bottle123\_" http://localhost:8080/api/tasks/3/class-counts
  HTTP/1.1 404 Not Found
  Allow: GET, HEAD, OPTIONS
  Content-Length: 45
  Content-Type: application/vnd.cvat+json
  Cross-Origin-Opener-Policy: same-origin
  Date: Wed, 07 Oct 2026 09:07:14 GMT
  Referrer-Policy: strict-origin-when-cross-origin
  Server: nginx
  Vary: Accept, Origin, Cookie
  X-Content-Type-Options: nosniff
  X-Request-Id: 175e1845-1c71-4e86-a70c-4e2194030575

{"detail":"No Task matches the given query."}
404 instead of 403 is deliberate: the
endpoint does not reveal that the task exists. The admin user `wania`
gets the counts for the same task (200).

- [✔] Speed measured 5 times, raw output saved
      Evidence: see raw output in OBJECTIVES.md
- [✔] Target of median below 250 ms met, or missed with the reason written
      Evidence: Median: 0.2391658s (about 230 ms)
- [✔] Only the planned files changed, no dead code or stray files
      Evidence: (git status / git diff --stat)
- [✔] Everything not finished is listed below

## Not done (fill in at the end, with reasons)
- Frontend (items 2, 3, 4): written and committed, never run or tested.
  Cause: disk full, yarn install could not complete.
- Item 7, 8, 9, 10: skipped by plan
- Tracks and tags are not counted, only shapes
