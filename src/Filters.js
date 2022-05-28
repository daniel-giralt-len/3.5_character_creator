function Filters({
    selectedPage,
    onFilterChange,
    filters,
    translate,
}){
    return (
    <div>
        {translate('Filters')}
        <button 
            onClick={() => onFilterChange({...filters, showDisallowed: !filters.showDisallowed})}
        >
            {translate('show disallowed')} [{filters.showDisallowed ? translate('ON') : translate('OFF')}]
        </button>
    </div>)
}
export default Filters