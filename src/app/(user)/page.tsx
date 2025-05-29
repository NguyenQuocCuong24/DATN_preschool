import React from 'react'
import Slider from './home_web/components/Home'
import System from './home_web/components/System_Inner'
import Intro from './home_web/components/Intro'
import Block from './home_web/components/Block_inner'

export default function page() {
  return (
    <div className=''>
      <Slider />
      <System />
      <Intro />
      <Block />
    </div>
  )
}
