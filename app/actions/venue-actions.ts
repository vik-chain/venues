"use server"

export async function submitVenue(formData: FormData) {
  // We'll implement this later with actual database operations
  console.log('Submitting venue:', {
    name: formData.get('name'),
    location: formData.get('location'),
    capacity: formData.get('capacity')
  })
} 