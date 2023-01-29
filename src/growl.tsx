import React from 'react'

import './growl.css'

type Props = {
  active: boolean
  message: string
  onDismissed: () => void
}

export const Growl = ({ active, message, onDismissed }: Props) => (
  <div className={`growl${active ? " active" : ""}`}>
    {message}
    <div onClick={onDismissed} className="growl-close" />
  </div>
)

export function useGrowl(delay?: number): [boolean, (active: boolean) => void] {
    // state of the growl

    const [growlActive, setGrowlActive] = React.useState<boolean>(false)

    // timeout function
    function timeout(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // sets the growl state to active before awaiting a delay then setting the state to inactive
    const setGrowlActiveWithDelay = async (active: boolean) => {
      setGrowlActive(active)
      await timeout(delay ?? 3000);
      setGrowlActive(!active)
    }

    return [
        // the first arg is the state
        growlActive, 

        // the second arg is a fn that allows you to safely set its state
        setGrowlActiveWithDelay,
    ]
}