import logger from 'jet-logger';

import EnvVars from './common/constants/env';
import { startScheduler } from './scheduler';
import server from './server';

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MESSAGE =
  'Express server started on port: ' + EnvVars.Port.toString();

/******************************************************************************
                                  Run
******************************************************************************/
async function bootstrap() {
  await startScheduler();
}

// Start the server
server.listen(EnvVars.Port, (err) => {
  bootstrap();
  if (!!err) {
    logger.err(err.message);
  } else {
    logger.info(SERVER_START_MESSAGE);
  }
});
