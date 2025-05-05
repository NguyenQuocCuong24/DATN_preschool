import React from 'react'
import Slider from './components/Home'
import System from './components/System_Inner'
import Intro from './components/Intro'
import Block from './components/Block_inner'

export default function page() {
  return (
    <div className='container'>
      <Slider />
      <System />
      <Intro />
      <Block />
    </div>
  )
}
