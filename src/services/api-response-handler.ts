import {path} from 'ramda';
import {translate} from '../i18n';
import {defaultAlert} from '../utility';
import {STATUS_CODES} from './status-codes';

export const apiResponseHandler = (apiResponse: any) => {
  if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
  } else if (path(['statusCode'], apiResponse) === STATUS_CODES.BAD_REQUEST) {
    // Bad request
  } else if (path(['statusCode'], apiResponse) === STATUS_CODES.UNAUTHORIZED) {
    // Unauthorized
  } else if (path(['statusCode'], apiResponse) === STATUS_CODES.NOT_FOUND) {
    // Not Found
  } else if (
    path(['statusCode'], apiResponse) === STATUS_CODES.INTERNAL_SERVER_ERROR ||
    path(['statusCode'], apiResponse) === STATUS_CODES.SERVICE_UNAVAILABLE
  ) {
    // internal server error or service not available
  } else {
    defaultAlert(
      translate('modules.errorMessages.error'),
      path(['error'], apiResponse),
    );
  }
};
