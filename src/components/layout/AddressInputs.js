export default function AddressInputs({
  addressProps,
  setAddressProps,
  disabled = false,
}) {
  const { phone, streetAddress, city, zip, country } = addressProps;
  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        placeholder="Phone Number"
        disabled={disabled}
        onChange={(ev) => setAddressProps("phone", ev.target.value)}
        value={phone || ""}
      />
      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Adress"
        disabled={disabled}
        value={streetAddress || ""}
        onChange={(ev) => setAddressProps("streetAddress", ev.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            disabled={disabled}
            value={city || ""}
            onChange={(ev) => setAddressProps("city", ev.target.value)}
          />
        </div>
        <div>
          <label>Zip</label>
          <input
            type="text"
            placeholder="Zip/Postal Code"
            disabled={disabled}
            value={zip || ""}
            onChange={(ev) => setAddressProps("zip", ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        disabled={disabled}
        value={country || ""}
        onChange={(ev) => setAddressProps("country", ev.target.value)}
      />
    </>
  );
}
