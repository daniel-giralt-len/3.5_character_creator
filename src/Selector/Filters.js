import { SelectedButton } from '../styles'

function Filters({
    onFilterChange,
    filters,
    translate,
}){
    return (
    <div>
        {translate('Filters')}:
        <SelectedButton
            selected={filters.showDisallowed}
            onClick={() => onFilterChange({...filters, showDisallowed: !filters.showDisallowed})}
        >
            {translate('show disallowed')}
        </SelectedButton>
    </div>)
}
export default Filters