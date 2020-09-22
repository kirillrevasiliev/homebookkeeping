import React from 'react'

const Loader: React.FC = () => {
  const colors = ['spinner-red-only', 'spinner-blue-only', 'spinner-green-only']
  const activeColor = colors[Math.floor(Math.random() * 3)]
  return (
    <div className="app-loader">
      <div className="preloader-wrapper active">
        <div className={`spinner-layer ${activeColor}`}>
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
