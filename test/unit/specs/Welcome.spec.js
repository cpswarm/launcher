import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import WelcomePage from '@/components/Welcome'
import ElementUI from 'element-ui'

describe('Welcome.vue', () => {
  it('should render correct contents', () => {
    const localVue = createLocalVue()
    localVue.use(ElementUI)

    // Example of test
    const wrapper = shallowMount(WelcomePage, {
      localVue
    })

    expect(true).to.equal(true)
  })
})
