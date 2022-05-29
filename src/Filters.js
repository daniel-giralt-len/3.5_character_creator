import { SelectedButton } from './styles'

function Filters({
    onFilterChange,
    filters,
    translate,
}){
    return (
    <div>
        {translate('Filters')}
        <SelectedButton
            selected={filters.showDisallowed}
            onClick={() => onFilterChange({...filters, showDisallowed: !filters.showDisallowed})}
        >
            {translate('show disallowed')} [{filters.showDisallowed ? translate('ON') : translate('OFF')}]
        </SelectedButton>
    </div>)
}
export default Filters