import { useCookies } from 'react-cookie'
import { useState } from 'react'
import styled from 'styled-components'

import Selector from './Selector/Selector'

import Header from './Header'
import corpusBase from './db/json/corpusBase.json'
import dbs from './db/json/dbs.json'

import getTranslator from './functions/getTranslator'

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 
    "header header"
    "left right";
`
const LeftWrapper = styled.div`grid-area: left;`
const RightWrapper = styled.div`grid-area: right;`

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
      <LeftWrapper>

      </LeftWrapper>
      <RightWrapper>
        <Selector 
          openTab={selectorItem}
          onChangeTab={handleChangeSelectorTab}
          creation={corpus}
          isCorpus={true}
          dbs={dbs}
          translate={translate}
          onCreationChange={handleCreationChange}
        />
      </RightWrapper>
  </ContentWrapper>)
}

export default CorpusCreatorPage;
