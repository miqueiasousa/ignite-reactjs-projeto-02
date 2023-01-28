import { useContext, useEffect, useRef } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CyclesContext } from '../../../../contexts/CyclesContext'

import { CountdownContainer, Separator } from './Countdown.styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    updateSecondsPassed
  } = useContext(CyclesContext)
  const intervalId = useRef<number | undefined>(undefined)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) return

    document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    if (activeCycle) {
      intervalId.current = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDiff >= totalSeconds) {
          updateSecondsPassed(0)
          markCurrentCycleAsFinished()
          clearInterval(intervalId.current)
        } else {
          updateSecondsPassed(secondsDiff)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalId.current)
    }
  }, [activeCycle, activeCycleId])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
