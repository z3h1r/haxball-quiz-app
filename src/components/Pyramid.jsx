import React from 'react'
import { pyramidData } from '../Question_Prize'

const Pyramid = ({ activePyramidId }) => {



  return (
    <div className="pyramid">

      <ul className="moneylist">

        {
          pyramidData.map(eachPyramid =>

            <li key={eachPyramid.id.toString()} className={activePyramidId === eachPyramid.id ? 'moneyListItem active' :
              eachPyramid.id < activePyramidId ? 'moneyListItem passed' : 'moneyListItem'}>
              <span className='moneyListItemNumber'>{eachPyramid.id}</span>
              <span className="moneyListItemAmount">{eachPyramid.amount}</span>
            </li>

          )
        }


      </ul>

    </div>
  )
}

export default Pyramid