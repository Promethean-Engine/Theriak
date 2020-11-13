import React, { useState } from 'react';
import './Content.css';

import { Epi } from '../../dataTypes';
import EpiList from '../EpiList/EpiList';

const mockedUpEpiList: Array<Epi> = [
    { id: 1, text: "Lorem ipsum dolor sit Maecenas feugiat tortor orci, eu lobortis "},
    { id: 2, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lCurabitur vitae venenatis mauris" },
    { id: 3, text: "Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 4, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis facilisis massa fringilla accumsan. Curabitur vitae venenatis mauris, nec fermentum augue." },
    { id: 6, text: "Lorem ipsum dolor sit Maecenas feugiat tortor orci, eu lobortis " },
    { id: 7, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lCurabitur vitae venenatis mauris" },
    { id: 8, text: "Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 9, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 10, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis facilisis massa fringilla accumsan. Curabitur vitae venenatis mauris, nec fermentum augue." },
    { id: 11, text: "Lorem ipsum dolor sit Maecenas feugiat tortor orci, eu lobortis " },
    { id: 12, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lCurabitur vitae venenatis mauris" },
    { id: 13, text: "Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 14, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
]

const Content: React.FC = () => {
    return (
        <div className='contentContainer'>
            <EpiList epiList={mockedUpEpiList} />
        </div>
    );

}

export default Content;

