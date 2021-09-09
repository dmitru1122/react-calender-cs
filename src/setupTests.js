import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

require('babel-core/register');
require('babel-polyfill');

global.fetch = require('jest-fetch-mock');

configure({ adapter: new Adapter() });
