import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { compile, createSSRApp, h } from 'vue';
import { parse } from 'vue/compiler-sfc';
import { renderToString } from 'vue/server-renderer';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

// The initial page must be serialized into the Nuxt payload, not fetched again
// while the browser hydrates HTML that may already be out of date.
test('initial history uses a hydration-safe Nuxt data request', async () => {
  const page = await read('pages/history.vue');
  assert.match(page, /await useAsyncData\(/);
  assert.doesNotMatch(page, /await loadMore\(\)/);
  assert.match(page, /if \(error.value\) throw error.value/, 'initial request failures must not silently render an empty grid');
});

test('each rendered card keeps its own cover and title', async () => {
  const sourceCard = parse(await read('components/TrackCard.vue')).descriptor.template.content;
  const sourceGrid = parse(await read('components/HistoryGrid.vue')).descriptor.template.content;
  const Icon = { render: () => h('i') };
  const TrackCard = {
    props: ['track'],
    components: { Icon },
    setup(props) {
      return { trackFullName: `${props.track.artist} - ${props.track.name}`, playAudio() {}, pauseAudio() {} };
    },
    render: compile(sourceCard),
  };
  const HistoryGrid = { props: ['historyItems'], components: { TrackCard }, render: compile(sourceGrid) };
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: `id-${i}`, played_at: `2026-11-05T00:00:0${i}Z`,
    artist: `Artist ${i}`, name: `Song ${i}`, album: `Album ${i}`,
    image_url: `https://example.test/cover-${i}.jpg`, spotify_url: `https://example.test/track-${i}`,
    preview_url: null,
  }));
  const html = await renderToString(createSSRApp({ render: () => h(HistoryGrid, { historyItems: items }) }));
  const cards = [...html.matchAll(/<li[^>]*>(.*?)<\/li>/gs)].map(match => match[1]);
  assert.equal(cards.length, items.length);
  items.forEach((item, i) => {
    assert.ok(cards[i].includes(`src="${item.image_url}"`), `cover ${i}`);
    assert.ok(cards[i].includes(`alt="${item.artist} - ${item.name}"`), `title ${i}`);
    assert.ok(cards[i].includes(`${item.artist} - ${item.name}`), `overlay ${i}`);
  });
});
