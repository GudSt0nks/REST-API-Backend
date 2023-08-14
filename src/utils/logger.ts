import logger from "pino";
import pretty from "pino-pretty";
import dayjs from "dayjs";

// beautiful logger


const stream = pretty({
    colorize: true
})

const log = logger({
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
}, stream);

export default log;