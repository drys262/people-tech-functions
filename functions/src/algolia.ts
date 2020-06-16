import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'dev_name';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

export default client;

export { ALGOLIA_INDEX_NAME, ALGOLIA_SEARCH_KEY };
