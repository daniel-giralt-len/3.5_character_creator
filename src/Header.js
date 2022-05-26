import webTranslations from './translations/webTranslations.json'

function Header({
    handleCreationSwitch,
    handleChangeTranslations,
    translate,
    isCorpus
}){
    const languages = Object.keys(webTranslations).filter(v => v !== '*')

    return (
        <div>
            <>
                <button onClick = {handleCreationSwitch}>
                    {translate('switch')}
                </button>
                <span>{isCorpus 
                    ? translate('creating a corpus') 
                    : translate('creating a character')}
                </span>
            </>
            <>
                {languages.map(key => (
                    <button
                        key={key}
                        onClick={() => handleChangeTranslations(key)}
                    >
                        {translate(key)}
                    </button>
                ))}
            </>
        </div>
    )
}

export default Header;