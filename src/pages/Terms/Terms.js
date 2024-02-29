
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
const TermsAndCondition = () => {
    const templateList = useSelector(state => state.TemplateReducer.templateList);
    const [content, setContent]= useState()
    useEffect(()=>{
        let data= templateList?.find((x)=>x?.name === "TERMS & CONDITIONS")
        setContent(data?.template)
    },[templateList])
    return (
        <div className='custom-header'>
            <div className='container'>
                <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(content) }} />
            </div>
            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>

        </div>
    )
}
export default TermsAndCondition