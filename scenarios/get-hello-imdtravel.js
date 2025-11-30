import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//     iterations: 10,
//     vus: 5,
// }


/**
 * target: number of virtual users
 * duration: time to stay at that level
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