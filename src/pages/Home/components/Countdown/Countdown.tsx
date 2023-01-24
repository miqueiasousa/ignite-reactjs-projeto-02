import { useEffect, useRef, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CountdownContainer, Separator } from './Countdown.styles'

interface CountdownProps {
  activeCycle: any
  setCycles: any
  activeCycleId: any
  setActiveCycleId: any
}

export function Countdown({
  activeCycle,
  setCycles,
  activeCycleId,
  setActiveCycleId
}: CountdownProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
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
          activeCycle.startDate
        )

        if (secondsDiff >= totalSeconds) {
          setCycles(state =>
            state.map(cycle => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  interruptedDate: new Date()
                }
              } else {
                return cycle
              }
            })
          )

          setAmountSecondsPassed(0)
          setActiveCycleId(null)
          clearInterval(intervalId.current)
        } else {
          setAmountSecondsPassed(secondsDiff)
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
