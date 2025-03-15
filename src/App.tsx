import { useState } from 'react'
import './App.css'
import { timeAgo } from './util/TimeUtil'

function App() {
  return (
    <>
      <div className='grid justify-center'>
        <div className='bg-blue-50 p-6'>
          <p>アジ鯖リソースパック</p>
          <p>リソースパック(テクスチャ)を<span className='underline'>今すぐダウンロード</span>できます。</p>
        </div>
        <div className='w-auto'>
          <p className='bg-amber-100 p-4 flex border-l-2 border-b-2 my-4'>
            <span className='flex items-center'>
              <img className='size-20 mr-6' src='https://images.weserv.nl/?url=https://raw.githubusercontent.com/azisaba/resourcepacks/main/life/pack.png&w=128&output=webp' />
              <div>
                <div className='text-xl'>Test Server</div>
                <p className='text-gray-500'>Test!!</p>
              </div>
            </span>
            <span className='flex ml-auto'>
              <div className='content-end'>
                <p>a</p>
                <p>last Updated: {timeAgo(new Date("2025-03-13T15:30:17Z"))}</p>
              </div>
              <div className='content-center'>Download</div>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
