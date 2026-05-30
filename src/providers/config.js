/**
 * SINGLE FILE TO CHANGE PROVIDERS
 * Change the import and export to switch between providers
 */

// Import all providers
import { hianimeProvider } from "./hianime";
import { gogoanimeProvider } from "./gogoanime";
import { animekaiProvider } from "./animekai";

// Import server lists
import { hianimeServers } from "./hianime/servers";
import { gogoanimeServers } from "./gogoanime/servers";
import { animekaiServers } from "./animekai/servers";

// ⭐️ CHANGE THIS LINE TO SWITCH PROVIDERS ⭐️
const ACTIVE_PROVIDER = "hianime";

const providers = {
  hianime: { impl: hianimeProvider, servers: hianimeServers },
  gogoanime: { impl: gogoanimeProvider, servers: gogoanimeServers },
  animekai: { impl: animekaiProvider, servers: animekaiServers },
};

export const activeProvider = providers[ACTIVE_PROVIDER];

if (!activeProvider) {
  throw new Error(`Provider "${ACTIVE_PROVIDER}" not found`);
}

export default activeProvider;