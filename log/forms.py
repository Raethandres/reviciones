from django import forms

class LoginForm(forms.Form):
	user=forms.CharField()
	pw=forms.CharField()

class LogupForm(forms.Form):
	user=forms.CharField()
	pw=forms.CharField()
		