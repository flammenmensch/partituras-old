import * as urlUtils from './url-utils';

it('tests parseQueryString function', () => {
  expect(urlUtils.parseQueryString('?query=')).toEqual({ query: '' });
  expect(urlUtils.parseQueryString('')).toEqual({ });
  expect(urlUtils.parseQueryString('key1=val1&key2=val2')).toEqual({ key1: 'val1', key2: 'val2' });
});
