#![cfg_attr(not(feature = "std"), no_std)]

/// Edit this file to define custom logic or remove it if it is not needed.
/// Learn more about FRAME and the core library of Substrate FRAME pallets:
/// https://substrate.dev/docs/en/knowledgebase/runtime/frame

use frame_support::{decl_module, decl_storage, decl_event, decl_error, dispatch, storage::IterableStorageMap, traits::Get};
use frame_system::{ensure_root, ensure_signed};
use crate::dispatch::Vec;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

/// Configure the pallet by specifying the parameters and types on which it depends.
pub trait Trait: frame_system::Trait {
	/// Because this pallet emits events, it depends on the runtime's definition of an event.
	type Event: From<Event<Self>> + Into<<Self as frame_system::Trait>::Event>;
}

// The pallet's runtime storage items.
// https://substrate.dev/docs/en/knowledgebase/runtime/storage
decl_storage! {
	// A unique name is used to ensure that the pallet's storage items are isolated.
	// This name may be updated, but each pallet in the runtime must use a unique name.
	// ---------------------------------vvvvvvvvvvvvvv
	trait Store for Module<T: Trait> as TemplateModule {
		// Learn more about declaring storage items:
		// https://substrate.dev/docs/en/knowledgebase/runtime/storage#declaring-storage-items
		PeaceIndicators get(fn indicators): map hasher(blake2_128_concat) u32 => Vec<u8>;
                Attestation get (fn attestations): map hasher(blake2_128_concat) T::AccountId => (u32, bool);
	}
}

// Pallets use events to inform users when important changes are made.
// https://substrate.dev/docs/en/knowledgebase/runtime/events
decl_event!(
	pub enum Event<T> where AccountId = <T as frame_system::Trait>::AccountId {
		/// Event documentation should end with an array that provides descriptive names for event
		/// parameters. [something, who]
                IndicatorStored(u32),
                InvestigationUnderway(u32),
                AttestedBy(AccountId, u32, bool),
	}
);

// Errors inform users that something went wrong.
decl_error! {
	pub enum Error for Module<T: Trait> {
		/// Error names should be descriptive.
		NoneValue,
		/// Errors should have helpful documentation associated with them.
		StorageOverflow,
	}
}

// Dispatchable functions allows users to interact with the pallet and invoke state changes.
// These functions materialize as "extrinsics", which are often compared to transactions.
// Dispatchable functions must be annotated with a weight and must return a DispatchResult.
decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		// Errors must be initialized if they are used by the pallet.
		type Error = Error<T>;

		// Events must be initialized if they are used by the pallet.
		fn deposit_event() = default;
            
                /// Removes all current indicators and instantiates the set with new indicators
		#[weight = 10_000 + T::DbWeight::get().writes(1)]
		pub fn sudo_submit_new_indicator_set(origin, indicators: Vec<Vec<u8>>) -> dispatch::DispatchResult {
			// Check that the extrinsic was signed and get the signer.
			// This function will return an error if the extrinsic is not signed.
			// https://substrate.dev/docs/en/knowledgebase/runtime/origin
			let _who = ensure_root(origin)?;
                        PeaceIndicators::drain(); 
                         
                        for (idx, indicator) in indicators.iter().enumerate() {
                            // Update storage.
			    PeaceIndicators::insert(idx as u32, indicator);
                            Self::deposit_event(RawEvent::IndicatorStored(idx as u32));
                        }
			
			// Emit an event.
			// Return a successful DispatchResult
			Ok(())
		}
                
                #[weight = 10_000 + T::DbWeight::get().writes(1)]
                pub fn raise_investigation(origin, indicator: u32) -> dispatch::DispatchResult {
                    let _who = ensure_root(origin)?;
                    Self::deposit_event(RawEvent::InvestigationUnderway(indicator));
                    Ok(()) 
                }

                #[weight = 500]
                pub fn attest_affirmative(origin, indicator: u32) -> dispatch::DispatchResult {
                    let who = ensure_signed(origin)?;
                    <Attestation<T>>::insert(&who, (indicator, true));
                    Self::deposit_event(RawEvent::AttestedBy(who, indicator, true));
                    Ok(())
                }

                #[weight = 500]
                pub fn attest_negative(origin, indicator: u32) -> dispatch::DispatchResult {
                    let who = ensure_signed(origin)?;
                    <Attestation<T>>::insert(&who, (indicator, false));
                    Self::deposit_event(RawEvent::AttestedBy(who, indicator, false));
                    Ok(())
                }
	}
}
