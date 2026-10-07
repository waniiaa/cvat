# Plan

Started: 7 Oct 2026, about 11:35 am. Limit: 8 hours.
Base: CVAT develop, commit SHA

C:\Users\PMLS\Desktop\cvat>git rev-parse HEAD
8d7ae755c5b8de82e8711756b35c0207655ef1ae.

## Goal
Show how many annotations each class has in a task, as a bar chart.

## Scope
## (items to deliver 1 to 6)
1. API endpoint: annotation count per class for a task, read from the database
2. Page in the web UI that calls it
3. Counts shown as a bar chart
4. Empty state and failed-request state
5. Uses CVAT login: no login is refused, a user without access to the task is refused
6. Speed target: median under 250 ms

## Order and time budget
| Step | What | Time |
|---|---|---|
| 1 | Setup, sample data, find the label and shape models in the code | 1.5h |
| 2 | Backend: new Django app `test`, endpoint, correct counts | 1h |
| 3 | Auth and permission check, show both refusals working | 1h |
| 4 | Frontend: page, route, bar chart | 1.5h |
| 5 | Empty and error states | 0.5h |
| 6 | Measure speed (5 runs), fill in docs | 1h |
| 7 | Loom recording | 0.5h |

## Decided to skip
- Item 7 (extra filter), items 8 and 9 (WebSocket), item 10 (decision record)
- Tracks and tags: only shapes are counted. This will be stated in the docs.

## Changes so far
- Importing the full COCO annotation file failed ("Could not match item id")
  because the task holds only a subset of images. Fix: a small script
  (kept outside the repo) filters the COCO file to the uploaded images and
  to the 5 labels (person, car, dog, chair, bottle).
- Upload then failed with a 500 error. Server log shows
  `file.seek(self.file_size - 1)` raising OSError in cvat/apps/engine/tus.py,
  which happens when the uploaded file has size 0. Cause: the filtered
  file was empty. Being fixed before backend work starts.
