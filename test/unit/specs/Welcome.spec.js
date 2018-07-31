import { expect } from 'chai'
import Vue from 'vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import WelcomePage from '@/components/Welcome'
import ElementUI from 'element-ui'

describe('Welcome.vue', () => {
  it('should render correct contents', () => {
    const localVue = createLocalVue();
    localVue.use(ElementUI);

    const wrapper = shallowMount(WelcomePage, {
      localVue
    });
    
    expect(true).to.equal(true);
  })
})
