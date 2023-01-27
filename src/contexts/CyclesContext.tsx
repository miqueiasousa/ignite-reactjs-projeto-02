import { createContext, ReactNode, useReducer, useState } from 'react'

interface CycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  updateSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({
  children
}: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function createNewCycle(data: CycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    // setCycles(prev => [...prev, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })
    // setCycles(state =>
    //   state.map(cycle => {
    //     if (cycle.id === activeCycleId) {
    //       return {
    //         ...cycle,
    //         interruptedDate: new Date()
    //       }
    //     } else {
    //       return cycle
    //     }
    //   })
    // )
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })
    // setCycles(state =>
    //   state.map(cycle => {
    //     if (cycle.id === activeCycleId) {
    //       return {
    //         ...cycle,
    //         finishedDate: new Date()
    //       }
    //     } else {
    //       return cycle
    //     }
    //   })
    // )
    setActiveCycleId(null)
  }

  function updateSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        updateSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
