from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Services, Category, Options, Records, Arrivals


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('service',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category',)

class OptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = ('quantity', 'price', 'duration')

class RecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = ('user', 'service', 'category', 'quantity', 'price', 'duration', 'paid', 'started', 'ends', 'expire')

class ArrivalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arrivals
        fields = ('user', 'service', 'category', 'arrival')