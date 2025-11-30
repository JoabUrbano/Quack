import http from 'k6/http';
import { sleep } from 'k6';

/**
 * This configuration will run the test with a 5 VUs for 10 iterations.
 * 
 */
// export const options = {
//     iterations: 10,
//     vus: 5,
// }


/**
 * This configuration will ramp up the number of virtual users (VUs) to 20 over 30 seconds,
 * then decrease to 10 VUs over the next 10 seconds,
 * and finally ramp down to 0 VUs over the last 20 seconds.
 * This simulates a gradual increase and decrease in load on the server.
 */
export const options = {
    stages: [
        {
            duration: '30s',
            target: 20
        },
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '20s',
            target: 0
        }
    ]
}



export default function() {
    http.get('http://localhost:8000/imdtravel')

    sleep(1);
}