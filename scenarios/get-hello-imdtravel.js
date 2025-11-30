import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    iterations: 10,
    vus: 5,
}

export default function() {
    http.get('http://localhost:8000/imdtravel')

    sleep(1);
}