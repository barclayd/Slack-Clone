import _ from 'lodash';

export default (e) => {
  if (e.name.toString() === 'SequelizeValidationError') {
    return e.errors.map(error => _.pick(error, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};
