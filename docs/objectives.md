# Objectives

## MO-1: Endpoint response time
| Field | Entry |
|---|---|
| What is measured | Time for the class-count endpoint to return its full response |
| How | `curl -w "%{time_total}"` with a valid session, run 5 times, raw output saved |
| Target | Median of 5 runs below 250 ms |
| Conditions | Local Docker stack, COCO sample data 1050 images and 3418 annotations, nothing else running, requests sent after one warm-up call |
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
- Annotations imported: 3418 COCO annotations in the filtered file,
  stored as 3843 shapes in CVAT (see DEFINITION_OF_DONE.md for the difference)


## Raw results
 1..5 | ForEach-Object { curl.exe -s -o NUL -w "run $_ : %{time_total}s`n" -u "wania:*******" http://localhost:8080/api/tasks/3/class-counts }
run 1 : 0.244171s
run 2 : 0.229249s
run 3 : 0.229315s
run 4 : 0.263373s
run 5 : 0.229721s

median=0.2391658s (about 230 ms). Min 0.229 s, max 0.263 s.
Target: median below 0.250 s. Met.
Note: run 4 (0.263 s) was above the target on its own. The time is the
whole request, including HTTP Basic authentication on each call.