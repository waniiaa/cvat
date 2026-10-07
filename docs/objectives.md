# Objectives

## MO-1: Endpoint response time
| Field | Entry |
|---|---|
| What is measured | Time for the class-count endpoint to return its full response |
| How | `curl -w "%{time_total}"` with a valid session, run 5 times, raw output saved |
| Target | Median of 5 runs below 250 ms |
| Conditions | Local Docker stack, COCO sample data (fill in image and annotation counts), nothing else running, requests sent after one warm-up call |
| Not included | The warm-up request after a restart, and the time the browser takes to draw the chart |

Why 250 ms: the endpoint is one grouped COUNT query on one task, so it
should be fast. The target is chosen to be reachable but still real
on a laptop with Docker.

## My machine
- CPU: 12th Gen Intel(R) Core(TM) i5-1235U
- RAM:  7,916 MB
- OS:  Microsoft Windows 10 Enterprise ( 10.0.19045 N/A Build 19045)
- CVAT commit SHA: 8d7ae755c5b8de82e8711756b35c0207655ef1ae
- Images in task: 1050 (task #3, coco-1050)
- Annotations imported: ~3418

## Raw results
(Paste the 5 raw curl outputs here, then median and min/max.)