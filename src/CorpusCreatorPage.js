import { useCookies } from 'react-cookie'
import { useState } from 'react'
import styled from 'styled-components'

import Selector from './Selector/Selector'

import Header from './Header'
import corpusBase from './db/json/corpusBase.json'
import dbs from './db/json/dbs.json'

import getTranslator from './functions/getTranslator'

const ContentWrapper = styled.div`
`
function CorpusCreatorPage() {
  const [cookies, setCookie] = useCookies(['character','corpus', 'filters'])
  const {corpus, language} = cookies
  if(!corpus) setCookie('corpus', corpusBase)
  if(!language) setCookie('language', 'es')

  const [selectorItem, setSelectorItem] = useState('races')
  
  const translate = getTranslator(language)
  const handleCreationChange = newCreation => setCookie('corpus', newCreation)
  const handleChangeTranslations = key => setCookie('language', key)

  const handleChangeSelectorTab = item => setSelectorItem(item)

  return (<ContentWrapper>
      <Header
        handleChangeTranslations={handleChangeTranslations}
        translate={translate}
        selectedLanguage={language}
        hideSelectorSwitch={true}
      />
      <Selector 
        openTab={selectorItem}
        onChangeTab={handleChangeSelectorTab}
        creation={corpus}
        isCorpus={true}
        dbs={dbs}
        translate={translate}
        onCreationChange={handleCreationChange}
    />
  </ContentWrapper>)
}

export default CorpusCreatorPage;
