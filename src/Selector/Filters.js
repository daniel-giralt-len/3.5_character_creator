import { SelectedButton } from '../styles'

function Filters({
    onFilterChange,
    filters,
    translate,
}){
    return (
    <>
        {translate('Filters')}:
        <SelectedButton
            selected={filters.showDisallowed}
            onClick={() => onFilterChange({...filters, showDisallowed: !filters.showDisallowed})}
        >
            {translate('show disallowed')}
        </SelectedButton>
    </>)
}
export default Filters