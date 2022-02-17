import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { FeedSection } from './FeedSection';

import dataSections from './dataSections.json';
import { useDispatch } from 'react-redux';
import { feedStartGetData } from '../../actions/feed';

export const Feed = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const history = useHistory();
  const [dataSection, setDataSection] = useState(name !== undefined ? dataSections[name] : []);


  useEffect(() => {
    if (dataSection.length !== 0) {
      dispatch(feedStartGetData(dataSection.endpoint, dataSection.dataEndpointName))
    }
  }, [])


  if (name === undefined) {
    history.push('/captura_de_datos/alumnos')
    console.log(name)
  }


  return (
    <div className='feed'>
      {
        name !== undefined ? <FeedSection dataSection={dataSection} /> : <h1>Cargando</h1>
      }
    </div>
  )
}
