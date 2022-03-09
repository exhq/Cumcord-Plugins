import { findByProps } from '@cumcord/modules/webpack';

import patchCategories from './patchCategories.js';
import patchGetDiscoverySplash from './patchGetDiscoverySplash.js';
import patchSearchBar from './patchSearchBar.js';
import patchTitleInDiscoverPage from './patchTitleInDiscoverPage.js';
import showGuilds from './showGuilds.js';

export default async () => {
  findByProps('isDispatching').dispatch({ type: 'GUILD_DISCOVERY_POPULAR_FETCH_SUCCESS' });
  let guildData = await (
    await fetch('https://public.alyxia.dev/guilddb.json', { cache: 'no-cache' })
  ).json();
  let patches = [
    patchCategories(),
    patchGetDiscoverySplash(guildData),
    patchSearchBar(),
    patchTitleInDiscoverPage(),
    showGuilds(guildData),
  ];

  return {
    onUnload: () => _.forEachRight(patches, (p) => p()),
  };
};
