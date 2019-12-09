import React from 'react'

const TabSubscriber = ({ subscriber }) => {
  return (
    <div className="card my-3">
      <h3 className="card-header bg-primary text-white">Subscriber Data</h3>
      <div className="card-body">
        <p className="font-weight-bold">
          Name: <span className="font-weight-normal">{subscriber.name}</span>
        </p>

        <p className="font-weight-bold">
          Code: <span className="font-weight-normal">{subscriber.code}</span>
        </p>

        <p className="font-weight-bold">
          Career:{' '}
          <span className="font-weight-normal">{subscriber.career}</span>
        </p>
      </div>
    </div>
  )
}

export default TabSubscriber
