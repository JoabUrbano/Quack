import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';

import http from 'k6/http';
import { sleep, check } from 'k6'; 
import exec from 'k6/execution';

/**
 * This configuration will run the test with a 5 VUs for 10 iterations.
 * 
 */
// export const options = {
//     iterations: 10,
//     vus: 5,
// }


/**
 * This configuration will ramp up the number of virtual users (VUs) to 20 over 5 seconds,
 * then decrease to 10 VUs over the next 6 seconds,
 * and finally ramp down to 0 VUs over the last 7 seconds.
 * This simulates a gradual increase and decrease in load on the server.
 */
// export const options = {
//     stages: [
//         {
//             duration: '5s',
//             target: 20
//         },
//         {
//             duration: '6s',
//             target: 10
//         },
//         {
//             duration: '7s',
//             target: 0
//         }
//     ],
//     thresholds: {
//         http_req_duration: ['p(95)<100'], // 95% of requests should be below 100ms,
//         http_req_failed: ['rate<0.01'] // less than 1% of requests should fail
//     }
// }


/**
 * This configuration defines two scenarios: a smoke test and a default ramping test.
 * The smoke test runs with 2 VUs for 5 seconds to quickly verify basic functionality.
 * The default scenario ramps up to 20 VUs, then down to 10, and finally to 0, similar to the previous example.
 */
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<100'], // 95% of requests should be below 100ms,
        http_req_failed: ['rate<0.01'] // less than 1% of requests should fail
    },
    scenarios: {
        smoke: {
            executor: 'constant-vus',
            vus: 2,
            duration: '5s',
        },
        default: {
            executor: 'ramping-vus', // Ramping VUs executor. Others: constant-vus, constant-arrival-rate, ramping-arrival-rate, shared-iterations, per-vu-iterations
            stages: [
                {
                    duration: '5s',
                    target: 20,
                },
                {
                    duration: '6s',
                    target: 10
                },
                {
                    duration: '7s',
                    target: 0
                }
            ],

        }
    }
}



export default async function() {
    const res = await http.get('http://localhost:8000/imdtravel')

    // console.log(` ${exec.test.options.scenarios.default.stages[0].target} VUs are running the test in the first stage.`);
    console.log(`Actives VUs: ${exec.instance.vusActive}`);

    // Check that the response status is 200
    check(res, {
        'is status 200': (r) => r.status === 200
    })

    // Assert that the response body contains the expected welcome message. If not, the test will stop and fail.
    expect(res.body).toContain('Welcome to IMDTravel API!');


    sleep(1);
}