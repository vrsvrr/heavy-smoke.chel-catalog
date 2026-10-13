<template>
  <section
    v-if="video?.url"
    class="product-video"
  >
    <h2 class="subtitle product-video__title">
      Видео о товаре
    </h2>

    <div class="product-video__wrapper">
      <iframe
        v-if="embedUrl"
        class="product-video__player"
        :src="embedUrl"
        :title="title"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>

      <video
        v-else-if="video.type === 'file'"
        class="product-video__player"
        controls
        preload="metadata"
        playsinline
      >
        <source
          :src="video.url"
          :type="video.mimeType || 'video/mp4'"
        />

        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  video: {
    type: Object,
    default: null,
  },

  title: {
    type: String,
    default: 'Видео о товаре',
  },
});

const embedUrl = computed(() => {
  if (!props.video?.url) {
    return '';
  }

  const { type, url } = props.video;

  if (type === 'file') {
    return '';
  }

  if (type === 'youtube') {
    try {
      const parsedUrl = new URL(url);

      let videoId = '';

      if (parsedUrl.hostname === 'youtu.be') {
        videoId = parsedUrl.pathname.split('/').filter(Boolean)[0] || '';
      } else if (
        ['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(
          parsedUrl.hostname,
        )
      ) {
        if (parsedUrl.pathname === '/watch') {
          videoId = parsedUrl.searchParams.get('v') || '';
        } else {
          const match = parsedUrl.pathname.match(
            /^\/(?:embed|shorts)\/([^/]+)/,
          );

          videoId = match?.[1] || '';
        }
      }

      if (!/^[\w-]{11}$/.test(videoId)) {
        return '';
      }

      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return '';
    }
  }

  if (type === 'vk') {
    try {
      const parsedUrl = new URL(url);
console.log(parsedUrl);

      const isVkHost =
        parsedUrl.hostname === 'vk.com' ||
        parsedUrl.hostname.endsWith('.vk.com') ||
        parsedUrl.hostname === 'vkvideo.ru' ||
        parsedUrl.hostname.endsWith('.vkvideo.ru');

      if (!isVkHost) {
        return '';
      }

      if (
        parsedUrl.pathname === '/video_ext.php' &&
        parsedUrl.searchParams.has('oid') &&
        parsedUrl.searchParams.has('id')
      ) {
        return parsedUrl.href;
      }

      return '';
    } catch {
      return '';
    }
  }

  return '';
});
</script>