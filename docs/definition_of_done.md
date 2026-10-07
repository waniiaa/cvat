# Definition of Done

Each line gets a number or a link when it is ticked.

- [ ] Endpoint returns correct counts, checked against a known task
      Evidence: (compare endpoint output with a count from the database or
      the CVAT UI for one label)
- [ ] Page calls the endpoint and shows a bar chart
      Evidence: (screenshot)
- [ ] Empty case shows a clear message, no crash
      Evidence: (screenshot of a task with no annotations)
- [ ] Failed request shows an error message, no crash
      Evidence: (screenshot with the backend stopped or a wrong task id)
- [ ] Request with no login is refused
      Evidence: (curl output showing 401 or 403)
- [ ] User without access to the task is refused
      Evidence: (curl output showing 403 or 404 for a second user)
- [ ] Speed measured 5 times, raw output saved
      Evidence: (raw output in OBJECTIVES.md)
- [ ] Target of median below 250 ms met, or missed with the reason written
      Evidence: (median number)
- [ ] Only the planned files changed, no dead code or stray files
      Evidence: (git status / git diff --stat)
- [ ] Everything not finished is listed below

## Not done (fill in at the end, with reasons)
- Item 7, 8, 9, 10: skipped by plan
- Tracks and tags are not counted, only shapes