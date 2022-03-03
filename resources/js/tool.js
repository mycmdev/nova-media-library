Nova.booting((Vue, router, store) => {
  Vue.component('index-media-library-field', require('./field/Index/index.vue').default);
  Vue.component('detail-media-library-field', require('./field/Detail/index.vue').default);
  Vue.component('form-media-library-field', require('./field/Form/index.vue').default);

  router.addRoutes([
    {
      name: 'nova-media-library',
      path: '/media-library',
      component: require('./tool/index.vue').default,
    },
  ]);

  window.nmlToastHook = e => {
    if ( 422 === e.response.status && e.response.data.message )
      Vue.prototype.$toasted.show(e.response.data.message, { type: 'error' })
  };
});


if ('object' === typeof Nova.config.novaMediaLibrary) {
  if (Nova.config.novaMediaLibrary.store === 'folders') {
    Nova.request().get('/nova-vendor/nova-media-library/folders').then(r => {
      Object.assign(Nova.config.novaMediaLibrary, { folders: r.data })
    })
  }
  if ('object' === typeof Nova.config.novaMediaLibrary.lang) {
    Object.assign(Nova.config.translations, Nova.config.novaMediaLibrary.lang)
  }
}

//document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=yes');
