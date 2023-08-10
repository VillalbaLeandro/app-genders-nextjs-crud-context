export function SelectOptionGenders({ gender }) {
    return (
      <option value={gender.title}>{gender.title}</option>
    );
  }
  