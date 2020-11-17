import React from 'react'
import * as Yup from "yup"


export default function validation() {
	return( 
		Yup.object(
			{
				password: Yup.string("")
					.min(8, "Password must contain at least 8 characters")
					.required("Enter password"),
				confirmPassword: Yup.string("Enter your password")
					.required("Confirm your password")
					.oneOf([Yup.ref("password")], "Password does not match")
			}
		)
	)
}
