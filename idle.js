import { onMount } from 'svelte';

/**
 * Track user's activity 
 * @param {number} [time = 1000 * 10] time - Time in ms until cb is executed
 * @param {function} [cb = alert('Time's up!')] cb - Function executed when time runs out
 * @params {object} [{events = ['mousedown', 'click', 'keypress', 'mousemove', 'scroll', 'load', 'touchstart', 'touchmove'], elem = document}] options - options (events, elem)
 * 
 */

const defaultEvents = ['mousedown', 'click', 'keypress', 'mousemove', 'scroll', 'load', 'touchstart', 'touchmove']

export function trackIdle(time = 1000 * 10, cb = () => alert('Time\'s up!'), options = {}) {
  let timer
  if(typeof window === 'undefined'){
    return
  }
  const elem = options.elem || document
  const events = options.events || defaultEvents
  onMount(() => {
    window.addEventListener('onload', resetTimer)
    events.forEach(e => {
      elem.addEventListener(e, resetTimer)
    })
    resetTimer()
    return clearTimer
  })
  
  function resetTimer(e){
    clearTimeout(timer)
    timer = setTimeout(cb, time)
  }

  function clearTimer(){
    clearTimeout(timer)
    events.forEach(e => {
      elem.removeEventListener(e, resetTimer)
    })
  }
}
